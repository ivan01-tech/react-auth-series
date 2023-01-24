import Axios from "../api/Axios"
import { useAuthCpntext } from "../context/AuthContext"

function useLogout() {

	const { setData: setAuth } = useAuthCpntext()
	const logout = async function () {

		try {
			const response = await Axios.get("/logout", { withCredentials: true })
			setAuth({})
			console.log("response : ", response)
		} catch (err) {
			console.log(err)
		}
	}

	return logout

}

export default useLogout