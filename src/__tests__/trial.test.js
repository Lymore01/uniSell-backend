function sum(a, b){
    return a+b
}

describe("simple test", ()=>{
    it("add 1 + 2 to be 3", ()=>{
        expect(sum(1, 2)).toEqual(3)
    })
})