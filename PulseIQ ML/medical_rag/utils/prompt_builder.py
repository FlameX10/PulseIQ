def build_medical_prompt(user_question, user_context, global_context):

    user_section = "\n\n".join(user_context) if user_context else "No previous medical history found."
    global_section = "\n\n".join(global_context) if global_context else "No general medical knowledge found."

    prompt = f"""
You are a medical AI assistant.

User Question:
{user_question}

User Medical History:
{user_section}

General Medical Knowledge:
{global_section}

Instructions:
- If user has relevant past medical history, personalize the response.
- If no past history, give general guidance.
- Be medically accurate.
- Do NOT provide diagnosis.
- Encourage consulting a healthcare professional when necessary.
- Keep answer clear and structured.

Provide a helpful response.
"""

    return prompt