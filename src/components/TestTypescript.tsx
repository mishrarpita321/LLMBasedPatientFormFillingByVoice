
export default function TestTypescript() {
    let numbers: number[] = [1, 2, 3]
    numbers[0].toString
    numbers.map((n)=>n*2)

    let users: {
        name: string,
        id: number
    } = {
        name: "ar",
        id: 1
    }
   
    console.log(users.name)
  return (
    <div>TestTypescript</div>
  )
}
//any, tupple, enum is for constants

