import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from utils.pdf_extractor import extract_text_from_pdf
from utils.chunker import chunk_text

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

GLOBAL_DATA_FOLDER = "global_data"
os.makedirs(GLOBAL_DATA_FOLDER, exist_ok=True)


# ✅ Append new document into global FAISS index
def append_to_global_index(file_path):

    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)

    if not chunks:
        return 0

    embeddings = embedding_model.encode(chunks)
    dimension = embeddings.shape[1]

    index_path = os.path.join(GLOBAL_DATA_FOLDER, "global_index.faiss")
    chunks_path = os.path.join(GLOBAL_DATA_FOLDER, "global_chunks.txt")

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


# ✅ Retrieve from global index
def retrieve_global_chunks(query, k=3):

    index_path = os.path.join(GLOBAL_DATA_FOLDER, "global_index.faiss")
    chunks_path = os.path.join(GLOBAL_DATA_FOLDER, "global_chunks.txt")

    if not os.path.exists(index_path):
        return []

    index = faiss.read_index(index_path)

    query_embedding = embedding_model.encode([query])
    D, I = index.search(np.array(query_embedding), k)

    if not os.path.exists(chunks_path):
        return []

    with open(chunks_path, "r", encoding="utf-8") as f:
        all_chunks = f.read().split("\n===CHUNK===\n")

    return [all_chunks[i] for i in I[0] if i < len(all_chunks)]