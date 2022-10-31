const path = require('path')
const fs = require('fs')

const loader = (currentPath) => {

    const routes = fs.readdirSync(currentPath).map(i => `${currentPath}/${i}`).map(item => {
        if (item.endsWith('.js')) return item;
    });

    return routes;
}

module.exports = loader;
