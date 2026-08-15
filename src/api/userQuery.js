// Contact API calls
import { fetchApi } from "@/config/apiClient";
import ENDPOINTS from "@/constant/Endpoints";

// Get all contact submissions (admin only)
export const getContactSubmissions = async (filters) => {
  const {
    searchVal = "",
    fullName = "",
    number = "",
    createdAt = "",
    subject = "",
    page = 1,
    limit = 5,
  } = filters;
  const queryParams = new URLSearchParams({
    searchVal,
    // number,
    // createdAt,
    // subject,
    page,
    limit,
  }).toString();
  return fetchApi(
    ENDPOINTS.userQuery.query(queryParams),
    "GET",
  );
};

// Get all support emails
export const getAllSupportEmails = async () => {
  return fetchApi(ENDPOINTS.userQuery.emails, "GET");
};

// Send a reply to a user
export const sendReplyEmail = async (replyData) => {
  return fetchApi(ENDPOINTS.userQuery.sendEmail, "POST", replyData);
};
