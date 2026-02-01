(comment) @comment

(identifier) @variable
(bind) @variable

(call_expr (bind) @function)
(call_expr argument: "?" @variable)

(binary_expr
  "~>"
  (expression (access_expr (bind) @function)))

(bind_expr
  (bind) @function
  (expression (function_expr)))

(bind_expr
  (bind) @function
  (expression (call_expr argument: "?")))

(null) @constant.builtin
(boolean) @constant.builtin.boolean
(number) @constant.builtin.numeric
(string) @string
(regex) @string.regex

"function" @keyword

"(" @punctuation.bracket
")" @punctuation.bracket
"[" @punctuation.bracket
"]" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket
":" @punctuation.delimiter
"," @punctuation.delimiter
";" @punctuation.delimiter

"or" @keyword.operator
"and" @keyword.operator
"in" @keyword.operator
"=" @operator
"!=" @operator
"<" @operator
">" @operator
"<=" @operator
">=" @operator
"+" @operator
"-" @operator
"*" @operator
"**" @operator
"/" @operator
"%" @operator
".." @operator
"~>" @operator
"&" @operator
"??" @operator
"?:" @operator
":=" @operator
"." @operator
"^" @operator
"#" @operator
"@" @operator

(condition_expr
  "?" @operator
  ":" @operator)

(condition_expr
  "?" @operator)

(transform_expr "|" @operator)
(filter_expr  "[" @operator)
(filter_expr  "]" @operator)
(reduce_expr (object "{" @operator))
(reduce_expr (object "}" @operator))
(order_expr "(" @operator)
(order_expr ")" @operator)
