class NamedEntityRecognition():
    def __init__(self):
        import spacy
        self.nlp = spacy.load("en_core_web_sm")

    def return_ner_analysis(self, text):
        doc = self.nlp(text)
        named_entity_recognition_result = {
            "noun phrases": [chunk.text for chunk in doc.noun_chunks],
            "verbs": [token.lemma_ for token in doc if token.pos_ == "VERB"]
        }
        for token in doc.ents:
            try:
                named_entity_recognition_result[token.label_].append(token.text)
            except:
                named_entity_recognition_result[token.label_] = []
                named_entity_recognition_result[token.label_].append(token.text)
        return named_entity_recognition_result



