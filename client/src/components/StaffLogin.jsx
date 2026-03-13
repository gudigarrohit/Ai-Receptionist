import { useState } from "react"
import axios from "axios"

export default function StaffLogin() {

    const [key, setKey] = useState("")

    const login = async () => {

        try {

            const res = await axios.post(
                "http://localhost:5000/api/staff-login",
                { accessKey: key }
            )

            if (res.data.success) {
                alert("Welcome Staff")
            }

        } catch {
            alert("Invalid Key")
        }

    }

    return (

        <div>

            <h3>Staff Portal</h3>

            <input
                type="password"
                placeholder="Enter Staff Key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
            />

            <button onClick={login}>
                Enter
            </button>

        </div>

    )

}