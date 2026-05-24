[
  (string)
  (regex)
  (comment)
  (number)
  (identifier)
  (bind)
] @leaf

(comment) @prepend_input_softline @append_input_softline

((comment)
  .
  (_) @allow_blank_line_before)

":=" @prepend_space @append_space

(binary_expr
  [
    "or"
    "and"
    "in"
    "="
    "!="
    "<="
    ">="
    "+"
    "-"
    "*"
    "/"
    "%"
    "&"
    "~>"
    ".."
    "?"
    "??"
    "?:"
    "<"
    ">"
  ] @prepend_space @append_space @prepend_empty_softline)

(binary_expr
  "." @prepend_empty_softline @prepend_indent_start
  (_) @append_indent_end)

(binary_expr
  "~>" @prepend_empty_softline @prepend_indent_start
  (_) @append_indent_end)

(negate_expr
  "-" @append_antispace)

(wildcard_expr) @prepend_antispace

(function_expr
  (function_params
    "(" @append_indent_start @append_empty_softline
    (_)
    ")" @prepend_indent_end @prepend_empty_softline @append_space))

(function_expr
  (function_params
    "," @append_spaced_softline
    .
    (comment)* @do_nothing))

(function_expr
  (function_params
    "(" @append_antispace
    ")" @prepend_antispace @append_space))

(function_expr
  (function_body
    "{" @append_spaced_softline @append_indent_start
    (expression
      (paren_expr))* @do_nothing
    (expression
      (literal
        (object)))* @do_nothing
    "}" @prepend_spaced_softline @prepend_indent_end))

(call_expr
  function: (_) @append_antispace
  "(" @append_empty_softline @append_indent_start
  (_)
  ")" @prepend_empty_softline @prepend_indent_end)

(call_expr
  "," @prepend_antispace @append_space @append_spaced_softline
  .
  (comment)* @do_nothing)

(array
  .
  "[" @append_indent_start @append_spaced_softline
  (_)
  "]" @prepend_indent_end @prepend_spaced_softline .)

(array
  .
  "[" @append_antispace
  "]" @prepend_antispace .)

(array
  "," @prepend_antispace @append_space @append_spaced_softline
  .
  (comment)* @do_nothing)

(array
  (_) @allow_blank_line_before)

(object
  .
  "{" @append_space @append_indent_start @append_spaced_softline
  (pair)
  "}" @prepend_space @prepend_indent_end @prepend_spaced_softline .)

(object
  (_) @allow_blank_line_before)

(object
  "," @prepend_antispace @append_space @append_spaced_softline
  .
  (comment)* @do_nothing)

(pair
  ":" @append_space)

(filter_expr
  "[" @append_antispace
  "]" @prepend_antispace)

(order_expr
  "^" @append_antispace
  "(" @append_antispace
  ")" @prepend_antispace)

(order_expr
  [
    "<"
    ">"
  ] @append_antispace)

(order_expr
  "," @prepend_antispace @append_space @append_spaced_softline
  .
  (comment)* @do_nothing)

(paren_expr
  .
  "(" @append_spaced_softline @append_indent_start
  (_)
  ")" @prepend_spaced_softline @prepend_indent_end .)

(paren_expr
  .
  "(" @append_antispace
  ")" @prepend_antispace .)

(paren_expr
  ";" @prepend_antispace @append_hardline)

(paren_expr
  (_) @allow_blank_line_before)

(condition_expr
  (_) @append_indent_start
  "?" @prepend_input_softline @append_space
  ":" @prepend_input_softline @append_space
  (_) @append_indent_end)

(condition_expr
  (_)
  "?"
  ":"
  (expression
    (binary_expr
      (_) @append_indent_start
      "?"
      (_) @append_indent_end)))

(transform_expr
  "|" @append_spaced_softline
  (_) @prepend_indent_start @append_indent_end
  "|" @prepend_spaced_softline @append_spaced_softline
  (_) @prepend_indent_start @append_indent_end
  ","* @prepend_antispace @append_spaced_softline
  (_)* @prepend_indent_start @append_indent_end
  "|" @prepend_spaced_softline)
