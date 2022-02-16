export const resolveRequest = async (apiCall) => {
    try {
        const res = await apiCall;
        if (res.status === 200) {
            return {
                error: false,
                data: res.data,
            }
        }
        else {
            alert("Somthing went Wrong");
            return {
                error: true,
            }

        }
    }
    catch(err) {
        alert("Somthing went Wrong");
        return {
            error: true,
        }
    }
}