import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Song from "../models/Song.js";

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "All fields are required!" });
	}

	const user = await User.findOne({ username });

	if (!user) {
		return res.status(404).json({ message: "User are not found! Please Register" });
	}

	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		return res.status(400).json({ message: "Incorrect password! Please enter the right password" });
	}

	const accessToken = jwt.sign(
		{
			user: {
				id: user.id,
				username: user.username,
			},
		},
		process.env.SECRET_KEY
	);

	const returnedUser = {
		id: user.id,
		username: user.username,
		favorites: user.favorites,
		playlists: user.playlists,
	};

	res.status(200).json({ user: returnedUser, token: accessToken });
};

//@desc Login a user
//@route POST /api/auth/register
//@access public
const registerUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "All fields are required" });
	}

	const duplicateUsername = await User.findOne({ username });
	if (duplicateUsername) {
		return res.status(400).json({ message: " Username are already exists! Please use different username" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({ username, password: hashedPassword });
	if (!newUser) {
		return res.status(400).json({ message: "User not created!" });
	}

	const accessToken = jwt.sign(
		{
			user: {
				id: newUser.id,
				username: newUser.username,
			},
		},
		process.env.SECRET_KEY
	);

	const returnedUser = {
		id: newUser.id,
		username: newUser.username,
		favorites: newUser.favorites,
		playlists: newUser.playlists,
	};

	res.status(200).json({ user: returnedUser, token: accessToken });
};

const getUserFavoriteSongs = async (req, res) => {
	const { id } = req.user;
	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({ message: "User are not found! Please Register First..." });
	}

	const userFavorites = await Promise.all(
		user.favorites.map((id) => Song.findById(id))
	);

	if (!userFavorites) {
		return res.status(404).json({ message: "Not found!" });
	}

	res.status(200).json(userFavorites);
};

export { loginUser, registerUser, getUserFavoriteSongs };
