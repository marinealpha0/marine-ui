import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEntityStatus } from "@/api/entity";
import { ENTITY_TYPES } from "@/constant/EntityTypes";

const ENTITY_QUERY_KEYS = {
    [ENTITY_TYPES.USER]: ["users", "userAnalytics"],
    [ENTITY_TYPES.ADMIN]: ["admins", "adminAnalytics"],
    [ENTITY_TYPES.FAQ]: ["faqs"],
    [ENTITY_TYPES.PROJECTS]: ["projects"],
    [ENTITY_TYPES.UPDATES]: ["latestUpdates", "upcomingFeatures"],
    [ENTITY_TYPES.COUPONS]: ["coupons"],
    [ENTITY_TYPES.COMPANY]: ["companies"],
    [ENTITY_TYPES.MCQS]: ["mcqs"],
    [ENTITY_TYPES.CHEATSHEETS]: ["cheatsheets"],
    [ENTITY_TYPES.TERMS_AND_CONDITIONS]: ["legal-pages"],
    [ENTITY_TYPES.JOB_POSTING]: ["posts", "postAnalytics"],
    [ENTITY_TYPES.MEMBERSHIPS]: ["subscriptions", "subscriptionAnalytics"],
    [ENTITY_TYPES.CATEGORIES]: ["categories"],
    [ENTITY_TYPES.COURSE]: ["courses"],
    [ENTITY_TYPES.COURSE_TOPICS]: ["courseTopics"],
    [ENTITY_TYPES.COURSE_TOPIC_VIDEO]: ["courseTopicVideos"],
    [ENTITY_TYPES.RESUME_MASTERS]: ["resumeTemplates"]
};

export const useToggleEntityStatus = (entityType, queryKeysToInvalidate) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (entityId) => {
            const response = await toggleEntityStatus(entityId, entityType);
            if (!response.status) {
                throw new Error(response.errorMsg || "Failed to toggle status");
            }
            return response.data;
        },
        onSuccess: () => {
            if (queryKeysToInvalidate) {
                const keys = Array.isArray(queryKeysToInvalidate) ? queryKeysToInvalidate : [queryKeysToInvalidate];
                keys.forEach(key => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
            } else {
                const keys = ENTITY_QUERY_KEYS[entityType];
                if (keys) {
                    keys.forEach(key => {
                        queryClient.invalidateQueries({ queryKey: [key] });
                    });
                }
            }
        },
    });
};

