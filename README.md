# EcoDrizzle Loyalty Program

A complete loyalty points management system with a modern React frontend and Node.js backend API. Users can earn points through social media engagement, redeem rewards, and track their loyalty progress.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
git clone <repository-url>
cd ecodrizzle-loyalty-program
./start-dev.sh
```

This script will:
- Install dependencies for both frontend and backend
- Start both servers automatically
- Check port availability
- Provide helpful status information

### Option 2: Manual Setup

1. **Start the Backend**:
```bash
cd loyalty-api
npm install
npm run dev
```

2. **Start the Frontend** (in a new terminal):
```bash
cd loyalty-app
npm install
npm run dev
```

3. **Open the app**: Visit `http://localhost:5173`

### Demo Credentials
- **Email**: demo@example.com
- **Password**: demo123

## 🏗️ Architecture

This project consists of two main components:

### Frontend (`loyalty-app/`)
- **React 18** with TypeScript
- **Vite** for fast development
- **Styled Components** for styling
- **React Router** for navigation
- **Context API** for state management

### Backend (`loyalty-api/`)
- **Node.js** with Express and TypeScript
- **JWT Authentication**
- **RESTful API** design
- **Mock data** for demo purposes

## API Integration

The frontend connects directly to the backend API for all data:

- **Backend API**: `http://localhost:3001/api`
- **Mock Data**: Provided by backend, not frontend
- **Configurable**: Set `VITE_API_URL` environment variable

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3001/api` |
| `VITE_DEBUG` | Enable API request logging | `true` |

---

# WSO2Con Lab Demo: Modernize Customer Reward System

## Part 1: Exposing a Legacy Enterprise Customer Reward System as a Modern RESTful API

### Step 1: Understand the Legacy Enterprise System

- Access the legacy web application `http://localhost:8080/enterprise-customer-rewards-system` (ensure you are connected to the company VPN or running locally).
- SSH into the VM hosting the legacy system to inspect application logs:
    - Check Tomcat logs:
        ```sh
        tail -f /opt/tomcat/logs/catalina.out
        ```
    - Check Tomcat service status:
        ```sh
        sudo systemctl status tomcat
        ```
    - Check MySQL service status:
        ```sh
        sudo systemctl status mysql
        ```
    - Check MySQL version:
        ```sh
        mysql --version
        ```
- Use `curl` commands to interact with the legacy API endpoints (run these inside the VM):
    - **Get All Customers:**
        ```sh
        curl -u admin:admin@123 http://localhost:8080/enterprise-customer-rewards-system/service/customers
        ```
    - **Get a Particular Customer:**
        ```sh
        curl -u admin:admin@123 "http://localhost:8080/enterprise-customer-rewards-system/service/customers?customerId=CUST001234"
        ```
    - **Get All Transactions:**
        ```sh
        curl -u admin:admin@123 http://localhost:8080/enterprise-customer-rewards-system/service/transactions
        ```
- Observe the API responses and note authentication or protocol requirements.

### Step 2: Create the Modern Customer API Project

- Create the project named `loyalty-customer-api`
- This project provides a RESTful API for customer and points management, acting as a gateway between modern JSON clients and the legacy XML backend.


### Step 3: Configure VPN Connectivity Between Choreo and the Legacy System

- On the legacy VM, check Tailscale status and connectivity:
    - Check Tailscale service status:
        ```sh
        sudo systemctl status tailscaled
        ```
    - Show Tailscale connection and IP:
        ```sh
        tailscale status
        tailscale ip
        ```
    - (If needed) Start or bring up Tailscale:
        ```sh
        sudo systemctl start tailscaled
        sudo tailscale up
        ```
- Confirm the VM is connected in the Tailscale admin UI.
- In Choreo, create a Tailscale TCP proxy component to securely connect the new project to the legacy system. For example, you can name the component `tailscale-tcp-proxy`.
    1. In your Choreo project, click **Create Component** and select **Service** as the component type.
    2. For the container registry path, choose **Choreo Samples Registry**.
    3. Select the **Tailscale TCP Proxy** image from the samples registry.
    4. Provide a name for your component (e.g., `tailscale-tcp-proxy`).
    5. Complete the creation process to add the Tailscale TCP proxy component to your project.
    6. Go to the **Deploy** section:
        - Set an environment variable `TS_AUTH_KEY` (value should be copied from the Tailscale web UI, e.g., `tskey-auth-kZzXi1fP4z11CNTRL-sfsfd`).
        - Mark the environment variable as **Secret**.
    7. In the next section, add a file named `/config.yaml` with the following content (replace the IP with the value from `tailscale ip` inside the VM):
        ```yaml
        portMappings:
          8080: "100.108.78.93:8080"
        ```
        - The first `8080` is the TCP proxy port on the Choreo side; the IP and port route to the legacy VM.
    8. Configure `endpoints.yaml` with:
        - Port: `8080`
        - Type: `tcp`
        - Network visibility: `Project`
        - Save the endpoint.
    9. Click **Next** and deploy the component.
    10. Go to **DevOps > Storage** and create a volume mount named `tailscalevolumes`:
        - Mount `/var/run/tailscale`
        - Mount `/.local`
    11. Once deployed, the Tailscale proxy should be running and visible as connected in the Tailscale web UI.

### Step 4: Onboard the Modern REST API Component (Go)

- Add the modern REST API as a new component (written in Go).
- Configure a connection to the TCP proxy component.
- Set environment variables for basic authentication credentials.
- Deploy the REST API component.
- Test the API using the Choreo Test page (no need to use curl or Postman).
- Set API visibility to "organization" (not exposed to the public internet).
    - For testing, temporarily expose the API to the internet and verify access.

---

## Part 2: Onboard Loyalty Campaign Project and Its Dependencies

### Step 1: Create the Loyalty Campaign Project

- In Choreo, create a new project named `loyalty-campaign-project`.

### Step 2: Create a GenAI Service for OpenAI

- At the project level, go to **Resources** > **GenAI Service** > **Register**.
- Select **OpenAI** as the provider.
- Give the service a name, e.g., `OpenAIService`.
- Create an endpoint named `prodendpoint`.
- Enter the API key:
  ```
  sk-proj-KunvJDCML2qxS5oV_aGPqMNdWYwUxzBlKUnvkAhybWefD086-PEMEh6HtP9w3XjaNGokNojG-3T3BlbkFJ6SZWVlBuRCxtRaf1aDHyWUrffRi5Fe
  ```
- Complete the registration process for the OpenAI GenAI service.

### Step 3: Create the Social Media Post Content Scorer API

- Open the `social-media-post-content-scorer` project in VS Code and verify that the MCP server is configured.
- In Choreo, within the `loyalty-campaign-project` under the `choreolabs` organization, create a new component for the Social Media Post Content Scorer API.
    - Follow the standard process to onboard the API as a component in the project.
    - Configure any required environment variables, endpoints, and dependencies as needed for the scorer API.

---

**Notes:**
- Ensure all credentials and keys are handled securely.
- Clean up any temporary public exposures after testing.
