import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	try {
		let token = req.header("Authorization") || req.header("authorization");

		if (!token) {
			return res.status(403).send("Authorization are missing!");
		}

		if (token && token.startsWith("Bearer")) {
			token = token.split(" ")[1];

			jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
				if (err) {
					return res.status(401).send("Invalid auth token");
				}
				req.user = decoded.user;
				next();
			});

			if (!token) {
				res.status(401).send("Authorization token are missing");
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
