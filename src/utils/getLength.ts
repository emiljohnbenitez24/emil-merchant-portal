
export const getlength = (obj) => {
    let newArr = []
    for (let o in obj) {
        newArr.push(obj[o])
    }
    return newArr.length
}