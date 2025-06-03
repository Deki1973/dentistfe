export const urlHeroku = `https://ancient-shelf-28732-e6ea5f258cc7.herokuapp.com`
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