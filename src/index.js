const isInload = attribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'in-load'
const isntInload = x => !isInload(x)

export default ({ types: t }) => ({
  visitor: {
    JSXElement: path => {
      const { node } = path
      const attributes = node.openingElement.attributes
      if (!attributes) return
      const ifAttribute = attributes.filter(isInload)[0]
      if (ifAttribute) {
        const opening = t.JSXOpeningElement(node.openingElement.name, attributes.filter(isntInload))
        const tag = t.JSXElement(opening, node.closingElement, node.children)

        const inLoading = t.JSXOpeningElement(t.JSXIdentifier('div'), [
          t.JSXAttribute(t.JSXIdentifier('className'), t.StringLiteral('in-loading'))
        ])
        const CloseInLoading = t.JSXClosingElement(t.JSXIdentifier('div'))
        const loadingTag = t.JSXElement(inLoading, CloseInLoading, [])

        const conditional = t.conditionalExpression(
          ifAttribute.value.expression, loadingTag, tag,
        )
        path.replaceWith(conditional)
      }
    }
  }
})
