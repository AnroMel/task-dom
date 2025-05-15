/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement(tag);
        el.textContent = content;
        document.body.appendChild(el);
    }
}

/*
Создайте дерево вложенных тегов DIV.
*/
export function generateTree(childrenCount, level) {
    function build(currentLevel) {
        const container = document.createElement('div');
        container.className = `item_${level - currentLevel + 1}`;

        if (currentLevel === 1) {
            return container; // Листовой узел без детей
        }

        for (let i = 0; i < childrenCount; i++) {
            const child = build(currentLevel - 1);
            container.appendChild(child);
        }

        return container;
    }

    return build(level);
}

/*
Замените все узлы второго уровня на SECTION
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);

    function walk(node) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

        if (node.classList?.contains('item_2')) {
            const section = document.createElement('section');
            section.className = node.className;
            while (node.firstChild) {
                section.appendChild(node.firstChild);
            }
            node.replaceWith(section);
            node = section; // продолжаем работать с новым узлом
        }

        for (const child of node.children) {
            walk(child);
        }
    }

    walk(tree);

    return tree;
}
