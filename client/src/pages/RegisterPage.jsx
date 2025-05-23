import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
    useToast, // Add this import
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";
import { client } from "../api";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { resetPlayer } from "../redux/slices/playerSlice";
// import toast  from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast(); // Add this hook

	const validateFields = () => {
		if (username == "" || password == "") {
			setError("All fields are required!");
			return false;
		} else {
			setError(null);
			return true;
		}
	};

	const handleRegister = async () => {
		if (validateFields()) {
			setLoading(true);
			try {
				const response = await client.post("/users/register", {
					username,
					password,
				});
				
				if (response.data) {
					toast({
						description: `Registration successful! ${username} Jii.`,
						status: "success",
						duration: 3000,
					});
					dispatch(resetPlayer());
					dispatch(loginUser(response.data));
					navigate("/home"); // Changed from /login to /home
				}
			} catch (error) {
				setError(error.response?.data?.message || "Registration failed!");
				toast({
					description: error.response?.data?.message || "Registration failed!",
					status: "error",
					duration: 3000,
				});
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Box minH="calc(100vh - 5rem)" maxW="2xl" mx="auto" p={6}>
			<Box
				bg={{ base: "zinc.950", md: "zinc.900" }}
				rounded="base"
				p={{ base: 2, md: 10 }}>
				<Box mb={8}>
					<Heading fontSize="2xl" color="zinc.200">
						Register
					</Heading>
					<Text fontSize="sm">To continue enjoying BeatBox</Text>
				</Box>
				<Flex direction="column" gap={4}>
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							Username
						</FormLabel>
						<Input
							border="1px"
							borderColor="zinc.600"
							rounded="base"
							outline={0}
							type="text"
							color="zinc.300"
							fontSize="sm"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel fontSize="xs" color="zinc.400">
							Password
						</FormLabel>
						<InputGroup border="1px" borderColor="zinc.600" rounded="base">
							<Input
								border="none"
								_focus={{ outline: "none" }}
								type={showPassword ? "text" : "password"}
								color="zinc.300"
								fontSize="sm"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<InputRightElement>
								<Button
									p={1}
									color="zinc.300"
									_hover={{ opacity: 0.8 }}
									variant="ghost"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					{error && (
						<Flex align="center" color="red.500" gap={4}>
							<MdError color="inherit" />
							<Text color="inherit" fontSize="xs">
								{error}
							</Text>
						</Flex>
					)}
					<Box mt={6}>
						<Button
							onClick={handleRegister}
							bg="accent.main"
							py={5}
							w="full"
							_hover={{ opacity: 0.8 }}>
							{loading ? <Spinner color="white" /> : "REGISTER"}
						</Button>
						<Text my={2} fontSize="sm" textAlign="center">
							OR
						</Text>
						<Link to="/home">
							<Text color="zinc.400" fontSize="sm" textAlign="center">
								Continue without logging in
							</Text>
						</Link>
					</Box>
					<Text fontSize="sm" color="zinc.400">
						Already have an account ?{" "}
						<Link to="/auth/login">
							{" "}
							<Text as="span" color="accent.main">
								Login
							</Text>
						</Link>
					</Text>
				</Flex>
			</Box>
		</Box>
	);
};

export default RegisterPage;
