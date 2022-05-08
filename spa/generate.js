const _ = require("lodash");
const {faker}  = require('@faker-js/faker');
module.exports = function () {
    return {
        books:
            _.times(100).map((num) => ({
                id: num,
                author: faker.name.findName(),
                title: faker.commerce.productName(),
                details: faker.lorem.sentence(100),
                avatar: faker.image.animals(200,200, true),
                genre: faker.commerce.department(),
                rating: _.random(2.2, 10 ).toFixed(1),
                published: _.random(2014, 2022 ).toFixed(0),
                buy_on: faker.company.companyName()
            }))
    }
}