# Payment to Telegram Notification Workflow Guide

This guide explains how to set up and use the new Flutterwave + Telegram payment workflow for Item 7.

## 1. Telegram Bot Setup
1.  **Create a Bot**: 
    *   Open Telegram and search for [@BotFather](https://t.me/BotFather).
    *   Send `/newbot` and follow the instructions to get your **Bot Token**.
2.  **Get your Chat ID**:
    *   Since Telegram doesn't allow sending messages directly to a phone number without a prior interaction, the recipient (you) must start a chat with the bot.
    *   Search for your new bot in Telegram and click **Start**.
    *   Now, search for [@userinfobot](https://t.me/userinfobot) and send any message to it. It will reply with your **Id** (this is your `TELEGRAM_CHAT_ID`).

## 2. Flutterwave Setup
1.  Log in to your [Flutterwave Dashboard](https://dashboard.flutterwave.com/).
2.  Go to **Settings > API Keys** to get your `FLW_PUBLIC_KEY` and `FLW_SECRET_KEY`.
3.  Go to **Settings > Webhooks**:
    *   Set the **URL** to: `https://your-server-url.com/api/webhook` (Use [ngrok](https://ngrok.com/) for local testing).
    *   Set a **Secret Hash** (this must match `FLW_SECRET_HASH` in your `.env`).

## 3. Backend Setup
1.  Navigate to the `server` directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
4.  Fill in your keys in `.env`.
5.  Start the server: `node index.js`

## 4. Frontend Usage
*   The **"Finalize Your Order"** section now includes a form for delivery details.
*   Clicking **"Pay & Place Order"** will redirect the user to a secure Flutterwave payment page.
*   Once payment is successful, the Flutterwave webhook will notify your backend, which then sends the formatted order details to your Telegram.

### Example Telegram Message Format:
```text
🚀 New Paid Order!

👤 Name: John Doe
📞 Phone: 08012345678
📍 Address: Hall 1, Room 101, CU

🍱 Order Details:
Beef Shawarma (2x)
Slushie (1x)

💰 Amount Paid: ₦11,500
🆔 Ref: item7-1623456789-123456

✅ Payment Verified
```

### Local Testing with ngrok
To receive webhooks on your local machine:
1.  Download ngrok and run: `ngrok http 5000`
2.  Copy the `https` URL provided by ngrok.
3.  Update your Flutterwave Webhook URL to: `https://xxxx-xxxx.ngrok-free.app/api/webhook`.
