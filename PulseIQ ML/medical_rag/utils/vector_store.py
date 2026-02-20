import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import os

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

USER_DATA_FOLDER = "user_data"
os.makedirs(USER_DATA_FOLDER, exist_ok=True)


def create_vector_store(chunks, user_id):

    embeddings = embedding_model.encode(chunks)
    dimension = embeddings.shape[1]

    index_path = os.path.join(USER_DATA_FOLDER, f"{user_id}_index.faiss")
    chunks_path = os.path.join(USER_DATA_FOLDER, f"{user_id}_chunks.txt")

    # Load existing index if exists
    if os.path.exists(index_path):
        index = faiss.read_index(index_path)
    else:
        index = faiss.IndexFlatL2(dimension)

    index.add(np.array(embeddings))
    faiss.write_index(index, index_path)

    # Append chunks
    with open(chunks_path, "a", encoding="utf-8") as f:
        for chunk in chunks:
            f.write(chunk + "\n===CHUNK===\n")

    return len(chunks)


def load_user_index(user_id):

    index_path = os.path.join(USER_DATA_FOLDER, f"{user_id}_index.faiss")

    if not os.path.exists(index_path):
        return None

    return faiss.read_index(index_path)


def retrieve_user_chunks(query, user_id, k=3):

    index = load_user_index(user_id)
    if index is None:
        return []

    query_embedding = embedding_model.encode([query])
    D, I = index.search(np.array(query_embedding), k)

    chunks_path = os.path.join(USER_DATA_FOLDER, f"{user_id}_chunks.txt")

    if not os.path.exists(chunks_path):
        return []

    with open(chunks_path, "r", encoding="utf-8") as f:
        all_chunks = f.read().split("\n===CHUNK===\n")

    return [all_chunks[i] for i in I[0] if i < len(all_chunks)]