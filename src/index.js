export default function ({ types: t }) {
  function checkMemberExpression(path) {
    if (!t.isMemberExpression(path)) {
      return;
    }

    const obj = t.isIdentifier(path.get('object').node, { name: 'module' });
    const prop = t.isIdentifier(path.get('property').node, { name: 'hot' });

    return obj && prop;
  }

  function processExpression(path) {
    const alternate = path.get('alternate');

    if (alternate.node) {
      let replacement;

      if (t.isConditionalExpression(path.node)) {
        replacement = alternate.node;
      } else {
        replacement = t.ifStatement(t.booleanLiteral(true), alternate.node);
      }

      path.replaceWith(replacement);
    } else {
      path.remove();
    }
  }

  return {
    visitor: {
      Conditional(path) {
        const test = path.get('test');

        if (!checkMemberExpression(test)) {
          return;
        }

        processExpression(path);
      },
    },
  };
};
