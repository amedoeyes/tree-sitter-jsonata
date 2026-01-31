package tree_sitter_jsonata_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_jsonata "github.com/amedoeyes/tree-sitter-jsonata/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_jsonata.Language())
	if language == nil {
		t.Errorf("Error loading JSONata grammar")
	}
}
