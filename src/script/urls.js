export const urlHeroku = `https://stark-caverns-43674-8eb4f8cb65af.herokuapp.com`
export const urlLocal = `http://localhost:8080`

export const checkResponseStatus = (response) => {
    if (response.status === 403) {
        window.alert("Warning! Access denied. Have you logged in?")
        return false
    }

    if (response.status === 204 || response.data == 0 || response.data === "" || response.data === null) {
        window.alert("There is no record with given parameter.")
        
        return false
    }
    return true
}