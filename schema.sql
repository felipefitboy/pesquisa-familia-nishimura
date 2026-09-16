CREATE TABLE IF NOT EXISTS respostas (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 criado_em TEXT NOT NULL DEFAULT (datetime('now')),
 frequencia TEXT NOT NULL,
 qualidade INTEGER NOT NULL,
 variedade INTEGER NOT NULL,
 atendimento INTEGER NOT NULL,
 limpeza INTEGER NOT NULL,
 custo_beneficio INTEGER NOT NULL,
 prato_favorito TEXT,
 prato_desejado TEXT,
 compraria_sobremesa TEXT NOT NULL,
 sobremesas TEXT NOT NULL,
 sobremesa_outra TEXT,
 recomendacao INTEGER NOT NULL,
 comentario TEXT
);
