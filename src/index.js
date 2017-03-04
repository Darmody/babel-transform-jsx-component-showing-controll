const isShow = attribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'is-show'
const isntShow = x => !isShow(x)
const isCustomComponent = attribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'show-tag'

export default ({ types: t }) => ({
  visitor: {
    JSXElement: path => {
      const { node } = path
      const attributes = node.openingElement.attributes
      if (!attributes) return
      const ifAttribute = attributes.filter(isShow)[0]
      if (ifAttribute) {
        const opening = t.JSXOpeningElement(node.openingElement.name, attributes.filter(isntShow))
        const tag = t.JSXElement(opening, node.closingElement, node.children)

        const customComponentAttribute = attributes.filter(isCustomComponent)[0]
        tagName = customComponentAttribute ? customComponentAttribute.value : 'InLoading'
        const inShowing = t.JSXOpeningElement(t.JSXIdentifier(tagName), [])
        const CloseinShowing = t.JSXClosingElement(t.JSXIdentifier(tagName))
        const showingTag = t.JSXElement(inShowing, CloseinShowing, [])

        const conditional = t.conditionalExpression(
          ifAttribute.value.expression, showingTag, tag,
        )
        path.replaceWith(conditional)
      }
    }
  }
})
