/**
 * @file Jsonata grammar for tree-sitter
 * @author Ahmed AbouEleyoun <amedoeyes@gmail.com>
 * @license AGPL-3
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
	name: "jsonata",

	extras: ($) => [/\s/, $.comment],

	rules: {
		program: ($) => $.expression,

		comment: (_) => token(seq("/*", repeat(/[^/]/), "*/")),

		expression: ($) =>
			choice(
				$.literal,
				$.function_expr,
				$.call_expr,
				$.access_expr,
				$.wildcard_expr,
				$.bind_expr,
				$.condition_expr,
				$.transform_expr,
				$.binary_expr,
				$.parent_expr,
				$.filter_expr,
				$.order_expr,
				$.reduce_expr,
				$.negate_expr,
				$.paren_expr,
			),

		function_expr: ($) => seq("function", $.function_params, $.function_body),
		function_params: ($) => seq("(", sepBy(",", $.bind), ")"),
		function_body: ($) => seq("{", $.expression, "}"),

		call_expr: ($) =>
			prec(
				10,
				seq(
					field("function", $.expression),
					"(",
					sepBy(",", field("argument", choice($.expression, "?"))),
					")",
				),
			),

		wildcard_expr: (_) => prec(10, choice("*", "**")),

		bind_expr: ($) => prec.right(1, seq($.bind, ":=", $.expression)),

		filter_expr: ($) => prec(8, seq($.expression, "[", $.expression, "]")),

		order_expr: ($) =>
			prec(
				4,
				seq(
					$.expression,
					"^",
					"(",
					sepBy(",", seq(choice("<", ">"), $.expression)),
					")",
				),
			),

		reduce_expr: ($) => prec(7, seq($.expression, $.object)),

		transform_expr: ($) =>
			prec(
				2,
				seq(
					"|",
					$.expression,
					"|",
					$.expression,
					optional(seq(",", $.expression)),
					"|",
				),
			),

		parent_expr: (_) => "%",

		condition_expr: ($) =>
			prec.right(
				1,
				seq($.expression, "?", $.expression, seq(":", $.expression)),
			),

		binary_expr: ($) => {
			const operators = [
				["right", 1, "?"],
				["left", 2, "or"],
				["left", 3, "and"],
				["left", 4, "??"],
				["left", 4, "?:"],
				["left", 4, ".."],
				["left", 5, "in"],
				["left", 5, "="],
				["left", 5, "!="],
				["left", 5, "<"],
				["left", 5, ">"],
				["left", 5, "<="],
				["left", 5, ">="],
				["left", 5, "~>"],
				["left", 6, "&"],
				["left", 6, "+"],
				["left", 6, "-"],
				["left", 7, "*"],
				["left", 7, "/"],
				["left", 7, "%"],
				["left", 8, "."],
				["left", 9, "#"],
				["left", 9, "@"],
			];
			return choice(
				...operators.map(([asc, bp, op]) =>
					prec[asc](
						bp,
						seq(field("left", $.expression), op, field("right", $.expression)),
					),
				),
			);
		},

		negate_expr: ($) => prec.right(7, seq("-", field("right", $.expression))),

		access_expr: ($) => choice($.bind, $.identifier),

		identifier: (_) => /[A-Za-z_][A-Za-z0-9_'"]*/,

		bind: (_) => choice("$", "$$", seq("$", /['"]?[A-Za-z_][A-Za-z0-9_'"]*/)),

		paren_expr: ($) => seq("(", sepBy(";", $.expression), optional(";"), ")"),

		literal: ($) =>
			choice($.number, $.string, $.regex, $.boolean, $.array, $.object, $.null),

		number: (_) => /(0|[1-9][0-9]*)(\.[0-9]+)?([Ee][-+]?[0-9]+)?/,

		string: (_) =>
			choice(
				seq(
					'"',
					repeat(choice(/[^\\"\n]+/, seq("\\", /(\"|\\|\/|b|f|n|r|t|u)/))),
					'"',
				),
				seq(
					"'",
					repeat(choice(/[^\\'\n]+/, seq("\\", /(\'|\\|\/|b|f|n|r|t|u)/))),
					"'",
				),
			),

		regex: (_) => token(seq("/", /([^\\/]|\\.)+/, "/", /[im]*/)),

		boolean: (_) => choice("true", "false"),

		array: ($) => seq("[", sepBy(",", $.expression), optional(","), "]"),

		object: ($) => seq("{", sepBy(",", $.pair), "}"),

		pair: ($) =>
			seq(field("key", $.expression), ":", field("value", $.expression)),

		null: (_) => "null",
	},
});

/**
 * Creates a rule to match one or more of the rules separated by the separator.
 *
 * @param {RuleOrLiteral} sep - The separator to use.
 * @param {RuleOrLiteral} rule
 *
 * @returns {SeqRule}
 */
function sepBy1(sep, rule) {
	return seq(rule, repeat(seq(sep, rule)));
}

/**
 * Creates a rule to optionally match one or more of the rules separated by the separator.
 *
 * @param {RuleOrLiteral} sep - The separator to use.
 * @param {RuleOrLiteral} rule
 *
 * @returns {ChoiceRule}
 */
function sepBy(sep, rule) {
	return optional(sepBy1(sep, rule));
}
