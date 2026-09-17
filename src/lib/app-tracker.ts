import { ApplicationTrackerItem, ApplicationStatus } from "./types";

const STORAGE_KEY = "matchpoint_applications_tracker";

export function loadApplicationsFromStorage(): ApplicationTrackerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ApplicationTrackerItem[];
  } catch (e) {
    console.error("Failed to load applications from local storage:", e);
    return [];
  }
}

export function saveApplicationToStorage(item: ApplicationTrackerItem): ApplicationTrackerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = loadApplicationsFromStorage();
    const filtered = existing.filter((a) => a.id !== item.id);
    const updated = [item, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save application to local storage:", e);
    return [];
  }
}

export function updateApplicationStatusInStorage(
  id: string,
  newStatus: ApplicationStatus
): ApplicationTrackerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = loadApplicationsFromStorage();
    const updated = existing.map((a) => (a.id === id ? { ...a, status: newStatus } : a));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to update status in local storage:", e);
    return [];
  }
}

export function deleteApplicationFromStorage(id: string): ApplicationTrackerItem[] {
  if (typeof window === "undefined") return [];
  try {
    const existing = loadApplicationsFromStorage();
    const updated = existing.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to delete application from local storage:", e);
    return [];
  }
}
