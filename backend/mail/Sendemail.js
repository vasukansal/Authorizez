import { mailTrapClient, sender } from "./mailtrap.config.js"
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js" 

    export const sendingVerificationMail=async (email,verificationToken)=>{
        const recipient=[{email}]
        try {
            await mailTrapClient.send({
                from:sender,
                to: recipient,
                subject:"Verify Your Email",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
                category:"Verification Email"
            })

            console.log("Verification email sent succesfully ")
        } catch (error) {
            console.log("Error sending Verification Email ", error)
            throw new Error("Error sending Verification Email ", error)
            }
    }


    export const WelcomeEmail=async (email,name)=>{
        const recipient=[{email}]
        try {
            await mailTrapClient.send({
                from:sender,
                to:recipient,
                template_uuid: "a7d6e8aa-5f29-4fb0-b1d9-d0c4a70fc0df",  //This is the template id which we created in mailtrap
                template_variables: {
                "name": name,
                "company_info_name": "Authorizez"
    }
            })
        } catch (error) {
            console.log("Error sending Welcome Email ", error)
            throw new Error("Error sending Welcome Email ", error)
        }
    }

    export const ResetPasswordMail= async(email,reseturl)=>{
        const recipient=[{email}]
        try {
            await mailTrapClient.send({
                from:sender,
                to:recipient,
                subject: "Password Reset Request",
                html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",reseturl),
                category:"Password Reset"
            })
            console.log("Password Reset Email sent successfully")
        } catch (error) {
            console.log("Error sending Password Reset Email ", error);
            throw new Error("Error sending Password Reset Email ");
        }
    }

    export const ResetSuccessfullMail= async(email)=>{
        const recipient=[{email}]
        try {
            await mailTrapClient.send({
                from:sender,
                to:recipient,
                subject: "Password Reset Successful",
                html:PASSWORD_RESET_SUCCESS_TEMPLATE,
                category:"Password Reset"
            })
        } catch (error) {
            console.log("Error sending Password Reset Email ", error);
            throw new Error("Error sending Password Reset Email");
        }
    }
    