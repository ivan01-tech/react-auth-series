import Axios from "../api/Axios"
import { useAuthCpntext } from "../context/AuthContext"
/**
 *A hooks to refresh token
 * @returns 
 */
const useRefreshToken = function () {

	const { setData: setAuth } = useAuthCpntext()

	const getNewToken = async function () {
		try {
			// the with credentials property is very important , DON'T FORGET IT
			const result = await Axios.get("/refresh", { withCredentials: true })
			const token = result.data.accessToken
			setAuth(prev => {
				console.log(prev.accessToken);
				console.log(token);
				return {
					...prev
					, accessToken: token
					, roles: result.data.roles
				}
			})
			return token
		} catch (err) {
			console.log("err ; ", err);
		}

	}

	return getNewToken

}

export default useRefreshToken