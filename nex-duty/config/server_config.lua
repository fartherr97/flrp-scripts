Server_Config = {}

Server_Config.State = "standalone" -- If you choose to use our hosted site at dutylogs.com, set this to 'hosted' 

-- Hosted Configuration
Server_Config.API_KEY = ""
Server_Config.API_URL = "https://api.dutylogs.com" -- DO NOT CHANGE THIS, thank you!
Server_Config.DisableGeographicInsights = false -- If set to true, the script will not handle or process IP Addresses for use of Geographical Insights on the website

-- Discord Bot Configuration
Server_Config.BotToken = "" -- This is the bot token of your discord bot, used for integrations for end-of-duty messages and more.. potentially
Server_Config.MessageFooter = "<insert server name here> - Server Duty System"

-- Testing Mode
Server_Config.TestMode = false -- This is used for testing and development purposes only!