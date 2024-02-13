```markdown
## Getting Started

To get started, follow these steps:

1. Go to the directory of the cloned repository, either PixelPlanet's or ours.

```bash
cd path/to/cloned/repository
```

2. Install the required libraries and dependencies using npm.

```bash
npm install
```

3. After the installation, you have two options:

   a. Run the game without making any changes.

   ```bash
   npm run build
   (edit the ecosystem.yml)
   pm2 start ecosystem.yml
   ```

   b. Prepare the game for deployment to make it accessible to everyone else. Note: Ensure you have a domain set up; Cloudflare is the recommended option.

4. If you are deploying the game for everyone else, make sure you have a domain set up (recommended: Cloudflare).

5. After the dependencies are installed, build the entire game in one go. Note: If you plan to make changes to the PixelPlanet code, it is not recommended to build the entire game to speed up development.

```bash
npm run build
```

This command runs the entire pixelplanet code, If you wanna change stuff then dont use this as it takes a long time.

6. When making changes outside the `dist` folder (the created folder to deploy PixelPlanet), build only one language to speed up the process. After making your changes, you can build the entire game to speed up the development process.

```bash
# Example command for building a specific language
npm run build -- --langs en
```

7. Ensure you have `pm2`, `npm`, `nodejs`, `redis`, and `mysql` installed on your system.

8. Set up the MySQL database and user with a password.

9. The Redis server on installation sets up itself and runs on port 6379, which is the default port of the PixelPlanet code, so you don't need to change the Redis configuration.

10. After completing all the steps, you need to edit the `ecosystem.yml` file in the `dist` folder, which is the main configuration.

### Necessary Configuration

| Variable       | Description              | Example                |
|----------------|:-------------------------|------------------------:|
| PORT           | Own Port                 | 8080                    |
| HOST           | Own Host                 | "localhost"             |
| REDIS_URL      | URL:PORT of Redis server | "redis://localhost:6379"|
| MYSQL_HOST     | MySQL Host               | "localhost"             |
| MYSQL_USER     | MySQL User               | "user"                  |
| MYSQL_PW       | MySQL Password           | "password"              |
| MYSQL_DATABASE | MySQL Database           | "pixelpladb"            |

### Optional Configuration

| Variable          | Description                           | Example                   |
|-------------------|:--------------------------------------|---------------------------|
| USE_PROXYCHECK    | Check users for Proxies               | 0                         |
| PROXYCHECK_KEY    | Key for proxycheck.io                 | "asfas-xcsc-ewef-sdfsd"   |
| APISOCKET_KEY     | Key for API Socket for SpecialAccess™ | "SDfasife3"               |
| ADMIN_IDS         | Ids of users with Admin rights        | "1,12,3"                  |
| CAPTCHA_TIME      | time in minutes between captchas      | 30                        |
|                   |  0: always captcha -1: never captcha  |                           |
| SESSION_SECRET    | random string for express sessions    | "ayylmao"                 |
| LOG_MYSQL         | if SQL queries should get logged      | 0                         |
| USE_XREALIP       | see Nginx / CDN section               | 1                         |
| BACKUP_URL        | URL of backup server (see Backup)     | "http://localhost"        |
| BACKUP_DIR        | Mounted directory of backup server    | "/mnt/backup/"            |
| HOURLY_EVENT      | Run hourly void event on the main canvas | 1                      |
| USE_MAILER        | Enable to use mail service             | 0                         |
| MAIL_ADDRESS      | Email address for sending mails       | "noreply@pixelplanet.fun" |

Rest of the instructions can be found on the PixelPlanet repository.
