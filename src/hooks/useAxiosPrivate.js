import { useEffect } from "react"
import { AxiosPrivate } from "../api/Axios"
import useRefreshToken from "../hooks/useRefreshToken"
import { useAuthCpntext } from "../context/AuthContext"

const useAxiosPrivate = function () {
	const refresh = useRefreshToken()
	const { data: auth } = useAuthCpntext()

	useEffect(() => {
		// request interceptor
		const resquestInterceptor = AxiosPrivate.interceptors.request.use(function (config) {
			if (!config.headers["Authorization"]) {
				config.headers["Authorization"] = `Bearer ${auth.accessToken}`
			}
			return config
		}, (err) => Promise.eject(err)
		)

		// response interceptor
		const responseInteceptor = AxiosPrivate.interceptors.response.use(response => response, async err => {
			// the sent property let us nkown if it's the first 
			const prevRequest = err?.config
			// because the error status should be forbidden
			if (err?.response?.status === 403 && !prevRequest?.sent) {
				prevRequest.sent = true
				const newToken = await refresh()
				prevRequest.headers["Authorization"] = `Bearer ${newToken}`
				// restart the request
				return AxiosPrivate(prevRequest)
			}

			return Promise.reject(err)
		})

		return () => {
			AxiosPrivate.interceptors.request.eject(resquestInterceptor)
			AxiosPrivate.interceptors.response.eject(responseInteceptor)
		}
	}, [refresh, auth])

	return AxiosPrivate
}

export default useAxiosPrivate 