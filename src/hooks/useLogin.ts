interface ILoginResponse {
   valid: boolean;
   error?: string;
}

const useLogin = () => {
   const login = async (
      email: string,
      password: string,
   ): Promise<ILoginResponse> => {
      const response = await fetch("/api/login", {
         method: "POST",
         headers: {
            "content-Type": "application/json",
         },
         body: JSON.stringify({ email, password }),
      });
      const { valid, error } = await response.json();
      if (!valid) {
         return { valid: valid, error: error };
      } else {
         return { valid: valid };
      }
   };
   return { login };
};

export default useLogin;
