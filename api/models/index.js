const Users = require("./users.model");
const StudyGroup = require("./study.group.model");
const Tutors = require("./tutors.model");

const PASGroup = require("./pas.group.model");
const PASGroupMembers = require("./pas.group.members.model");
const OUP = require("./oup.model");
const PAS = require("./pas.model");

const CriteriaGroup = require("./criteria.group.model");
const Criteria = require("./criteria.model");
const SubCriteria = require("./subcriteria.model");
const Points = require("./points.model");

const Compitions = require("./universal.compition.model");
const CompitionsPoints = require("./compition.points.model");

module.exports = {
    Users,
    StudyGroup,
    Tutors,
    PASGroup,
    OUP,
    PAS,
    CriteriaGroup,
    Criteria,
    SubCriteria,
    Points,
    PASGroupMembers,
    Compitions,
    CompitionsPoints,
};
