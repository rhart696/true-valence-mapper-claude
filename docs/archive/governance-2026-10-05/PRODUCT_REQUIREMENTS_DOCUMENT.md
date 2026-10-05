# Product Requirements Document: True Valence Mapper

## 1. Overview

True Valence Mapper is a visual tool designed to help users understand and reflect on the trust dynamics within their personal and professional relationships. It provides a simple, intuitive interface for mapping and scoring trust, enabling users to identify patterns, asymmetries, and areas for potential growth.

## 2. Target Audience

*   Individuals seeking self-reflection and personal growth.
*   Coaches and therapists working with clients on relationship dynamics.
*   Teams and managers looking to improve team cohesion and trust.

## 3. Core Features

### 3.1. Relationship Canvas

*   **FR-1.1:** Users shall be able to create a new, blank relationship map.
*   **FR-1.2:** The canvas shall support adding up to a maximum of 8 individuals (nodes) to a single map.
*   **FR-1.3:** Each individual on the canvas shall be represented by a node, customizable with their name.
*   **FR-1.4:** The user's own node shall be visually distinct and serve as the central point of the map.

### 3.2. Trust Scoring

*   **FR-2.1:** For each individual added to the map, there shall be a bidirectional relationship link with the user.
*   **FR-2.2:** Each direction of the relationship link must be independently scorable.
    *   One direction represents the user's trust in that individual ("Outward Trust").
    *   The other direction represents the user's perception of that individual's trust in them ("Inward Trust").
*   **FR-2.3:** Users shall be able to assign one of the following trust scores to each direction of a link:
    *   **3 (High Trust):** Indicates strong trust and willingness to be vulnerable.
    *   **2 (Medium Trust):** Indicates conditional or situational trust.
    *   **1 (Low Trust):** Indicates a lack of trust or discomfort.
    *   **0 (Unscored):** The default state before a user provides a score.
*   **FR-2.4:** The scoring interaction shall be simple and intuitive, such as clicking through the available scores.

### 3.3. Visualization

*   **FR-3.1:** The relationship map shall be presented as a clear, easy-to-understand visual diagram.
*   **FR-3.2:** The trust scores shall be visually represented using a color-coded system:
    *   High Trust: Green
    *   Medium Trust: Yellow
    *   Low Trust: Red
    *   Unscored: Gray
*   **FR-3.3:** The directionality of the trust scores shall be clearly indicated (e.g., with arrows).

### 3.4. Data Persistence & Portability

*   **FR-4.1:** Users shall be able to save their current relationship map.
*   **FR-4.2:** Users shall be able to load a previously saved map, restoring the canvas to its saved state.
*   **FR-4.3:** The application must function fully while offline.
*   **(Future)** **FR-4.4:** Users shall be able to export their map to a common image format (e.g., PNG, PDF).
*   **(Future)** **FR-4.5:** Users shall be able to create and manage multiple, named maps associated with a user account.

## 4. Non-Functional Requirements

### 4.1. Usability & Accessibility

*   **NFR-1.1:** The application shall be responsive and usable across a range of devices, including desktops and mobile phones.
*   **NFR-1.2:** All core functionality shall be navigable using a keyboard.
*   **NFR-1.3:** The user interface shall provide sufficient color contrast and alternative cues for colorblind users.

### 4.2. Security

*   **NFR-2.1:** All user-provided input must be sanitized to prevent cross-site scripting (XSS) and other injection attacks.
*   **NFR-2.2:** When a backend is implemented, user data must be stored securely, with appropriate access controls (e.g., Row Level Security).

## 5. Future Vision & Potential Enhancements

*   **AI-Powered Insights:** Provide automated analysis of the user's map to highlight significant patterns, asymmetries, or potential areas of conflict/opportunity.
*   **Team & Organizational Mapping:** Expand the tool to allow for multi-user, collaborative mapping of team or organizational trust dynamics.
*   **Guided Exercises:** Include prompts and guided exercises to help users interpret their maps and develop action plans.
*   **Historical Tracking:** Allow users to save snapshots of their maps over time to track the evolution of their relationships.
