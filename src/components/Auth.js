import { auth, initializeRecaptcha } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");  // Champ pour le code de vérification
    const [authMessage, setAuthMessage] = useState("");  // État pour afficher le message d'authentification
    const [confirmationResult, setConfirmationResult] = useState(null);  // Stocker le résultat de confirmation

    useEffect(() => {
        initializeRecaptcha();
    }, []);

    const SignIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setAuthMessage("Inscription par email réussie !");
        } catch (err) {
            console.log(err);
            setAuthMessage("Erreur lors de l'inscription par email.");
        }
    };

    const SignInWithPhoneNumber = async () => {
        const appVerifier = window.recaptchaVerifier;
        try {
            // Envoyer le code de vérification par SMS
            const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setConfirmationResult(result);  // Stocke le résultat pour la vérification
            setAuthMessage("Code de vérification envoyé ! Vérifiez votre téléphone.");
        } catch (err) {
            console.log(err);
            setAuthMessage("Erreur lors de l'authentification par numéro de téléphone.");
        }
    };

    const verifyCode = async () => {
        if (!confirmationResult) return;  // Vérifie que le code a bien été envoyé
        try {
            // Vérification du code entré par l'utilisateur
            await confirmationResult.confirm(verificationCode);
            setAuthMessage("Authentification réussie !");
        } catch (err) {
            console.log(err);
            setAuthMessage("Le code de vérification est incorrect.");
        }
    };

    return (
        <div className="container col-lg-7 my-3">
            <h4 className="text-center fst-italic text-info">Login</h4>
            <div className="w-50 m-auto card p-5 bg-info bg-opacity-10 border border-info border-end-0 rounded-start">
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="form-control"
                        id="phoneInput"
                    />
                </div>
                <button
                    type="button"
                    onClick={SignIn}
                    className="btn btn-primary"
                >
                    S'inscrire avec Email
                </button>

                <button
                    type="button"
                    onClick={SignInWithPhoneNumber}
                    className="btn btn-primary mt-3"
                >
                    S'inscrire avec numéro
                </button>

                {confirmationResult && (
                    <div className="mb-3 mt-3">
                        <label className="form-label">Code de vérification</label>
                        <input
                            type="text"
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="form-control"
                            id="verificationCodeInput"
                        />
                        <button
                            type="button"
                            onClick={verifyCode}
                            className="btn btn-success mt-2"
                        >
                            Vérifier le code
                        </button>
                    </div>
                )}

                <div id="recaptcha-container"></div>

                {/* Afficher le message d'authentification */}
                {authMessage && (
                    <div className="alert alert-info mt-3">
                        {authMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

