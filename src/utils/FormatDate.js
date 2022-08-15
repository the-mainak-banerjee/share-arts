export default function formatDate(serverDate) {
    const date = new Date(serverDate?.toDate())
    const formatedHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const formatedMins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const formatedDate = date.toDateString()

    return{
        formatedHour,
        formatedMins,
        formatedDate
    }

}