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
		expression: ($) => choice($.bind_expr, $.call_expr),
		call_expr: ($) => seq($.bind_expr, "(", optional($.argument_list), ")"),
		argument_list: ($) => seq($.expression, repeat(seq(",", $.expression))),
		bind_expr: (_) =>
			choice(
				token("$"),
				token("$$"),
				token("%"),
				seq("$", /[a-zA-Z_][a-zA-Z0-9_]*/),
			),
		comment: (_) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
	},
});
