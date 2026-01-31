import XCTest
import SwiftTreeSitter
import TreeSitterJsonata

final class TreeSitterJsonataTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_jsonata())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading JSONata grammar")
    }
}
