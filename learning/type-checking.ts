
enum AlgoEnum {
    algo1 = 'algo1', algo2 = 'algo2', algo3 = 'algo3'
}

type Criteria = {
    filter: string
    algo: AlgoEnum
}

function test(query: string) {
    console.log(`testing ${query}`)
    if (query in AlgoEnum) {
        console.log('yes')
        const criteria: Criteria = {
            algo: query as AlgoEnum,
            filter: 'someFilter',
        }
        console.log('criteria', JSON.stringify(criteria))
    }
    else {
        console.log('no')
    }
}

// Test this file with bun run 
const badString = 'algo4'
test(badString)

const goodString = 'algo3'
test(goodString)
// Reference:
// https://www.typescriptlang.org/docs/handbook/enums.html