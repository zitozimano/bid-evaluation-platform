useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    credentials: "include",
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => setUser(data))
    .finally(() => setLoading(false));
}, []);
