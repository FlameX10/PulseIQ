import google.genai as genai
import os
from dotenv import load_dotenv
from google.genai import errors

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_response(prompt):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        return response.text
    except errors.ClientError as e:
        # ClientError might have different attributes, check error message instead
        error_str = str(e).lower()
        if "429" in error_str or "quota" in error_str or "rate limit" in error_str:
            raise Exception("API quota exceeded. Please try again later or upgrade to a paid plan.")
        else:
            raise Exception(f"API Error: {str(e)}")
    except Exception as e:
        error_str = str(e).lower()
        if "quota" in error_str or "429" in error_str or "rate limit" in error_str:
            raise Exception("API quota exceeded. Please try again later or upgrade to a paid plan.")
        raise Exception(f"Error generating response: {str(e)}")