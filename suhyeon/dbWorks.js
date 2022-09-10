const database = require('./database.js')

const dataFiltered = (which, args) => {
    let result = database[which].filter((item) => {
        // 조건인자가 없거나, 페이징 관련 인자거나
        // 모든 요소가 아이템과 모두 일치하면 통과
        return !args || Object.keys(args).reduce((a, b) => {
            return a && (
                ['page', 'per_page'].includes(b) ||
                item[b] == args[b]
            )
        }, true)
    })

    // 페이징
    if (args.page && args.per_page) {
        result = result.slice(
            (args.page - 1) * args.per_page,
            args.page * args.per_page)
    }

    return result
}

const dbWorks = {
    getMembers: (args) => dataFiltered('members', args),
    getGroups: (args) => dataFiltered('groups', args),
    getRoles: (args) => dataFiltered('roles', args),
    getMember: (args) => dataFiltered('members', args).filter((member) => member.id === args.id)[0],
    editMember: (args) => {
        return database.members.filter((member) => member.id === args.id).map((member) => {
            Object.assign(member, args.input);
            return member;
        })[0]
    },

    deleteItem: (which, args) => {
        const deleted = database[which].filter((item) => {
            return item.id == args.id
        })[0]
        database[which] = database[which].filter((item) => {
            return item.id != args.id
        })
        return deleted
    },
}

module.exports = dbWorks
