import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function validateEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

const initialForm = {
	email: "",
	password: "",
	terms: false,
};

const initialErrors = {
	email: false,
	password: false,
	terms: false,
};
const errorMessages = {
	email: "Geçerli bir email adresi yaz",
	password: "Şifre en az 6 karakterden oluşmalı",
};
export default function Signup() {
	const [form, setForm] = useState(initialForm);

	function handleChange(event) {
		let { name, value, type } = event.target;
		value = type === "checkbox" ? event.target.checked : value;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(form);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormGroup>
				<Label for="email">Email</Label>
				<Input
					name="email"
					onChange={handleChange}
					placeholder="email"
					type="email"
					data-testid="email"
					value={form.email}
				/>
				{form.email && !validateEmail(form.email) ? (
					<div>{errorMessages.email}</div>
				) : null}
			</FormGroup>
			<FormGroup>
				<Label for="password">Password</Label>
				<Input
					name="password"
					onChange={handleChange}
					placeholder="password"
					type="password"
					data-testid="password"
					value={form.password}
				/>
				{form.password && form.password.length < 6 ? (
					<div>{errorMessages.password}</div>
				) : null}
			</FormGroup>
			<FormGroup>
				<Label for="terms">Accept Terms and Conditions</Label>
				<Input
					name="terms"
					onChange={handleChange}
					type="checkbox"
					data-testid="terms"
					checked={form.terms}
				/>
			</FormGroup>
			<Button
				data-testid="send"
				disabled={
					!form.terms ||
					!validateEmail(form.email) ||
					form.password.length < 6
				}
			>
				Kaydet
			</Button>
		</Form>
	);
}
