const { default: adminBro } = require("admin-bro");
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("admin-bro-mongoose");

AdminBro.registerAdapter(AdminBroMongoose);

const models = require("../api/models/index.js");

const {
    Users,
    StudyGroup,
    Tutors,
    PASGroup,
    PASGroupMembers,
    OUP,
    PAS,
    CriteriaGroup,
    Criteria,
    SubCriteria,
    Points,
    CompitionsPoints,
    Compitions,
} = models;

const menu = {
    people: { name: "Люди", icon: "UserMultiple" },
    PAC: { name: "ПАЦ", icon: "UserAdmin" },
    OUP: { name: "ОУП", icon: "Event" },
    rating: { name: "Рейтинг", icon: "DataTable" },
    compition: { name: "Универсальные компитенции", icon: "Diagram" },
};

/** @type {AdminBro.AdminBroOptions} */
const options = {
    resources: [
        {
            resource: Users,
            options: {
                parent: menu.people,
                properties: {
                    _id: { isVisible: false },
                },
            },
        },
        {
            resource: StudyGroup,
            options: {
                parent: menu.people,
                properties: {
                    _id: { isVisible: false },
                },
            },
        },

        {
            resource: Tutors,
            options: {
                parent: menu.PAC,
                properties: {
                    _id: { isVisible: false },
                    fullName: { isTitle: true },
                },
            },
        },
        {
            resource: PASGroup,
            options: {
                parent: menu.OUP,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: PASGroupMembers,
            options: {
                parent: menu.OUP,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: OUP,
            options: {
                parent: menu.OUP,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: PAS,
            options: {
                parent: menu.OUP,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: CriteriaGroup,
            options: {
                parent: menu.rating,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: Criteria,
            options: {
                parent: menu.rating,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: SubCriteria,
            options: {
                parent: menu.rating,
                properties: {
                    _id: { isVisible: false },
                    serviceName: { isTitle: true },
                },
            },
        },
        {
            resource: Points,
            options: {
                parent: menu.rating,
                properties: {
                    _id: { isVisible: false },
                },
            },
        },
        {
            resource: Compitions,
            options: {
                parent: menu.compition,
                properties: {
                    _id: { isVisible: false },
                },
            },
        },
        {
            resource: CompitionsPoints,
            options: {
                parent: menu.compition,
                properties: {
                    _id: { isVisible: false },
                },
            },
        },
    ],
    //TODO TRANSLATE TO RUSSIAN
    //TODO ADD LOGIN AND PASSWORD
    locale: {},
    rootPath: "/",
    branding: {
        companyName: "ПАЦ админ-панель",
        softwareBrothers: false,
    },
};

module.exports = options;
