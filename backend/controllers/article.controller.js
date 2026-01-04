import { query } from "../config/database.js";

/**
 * PUBLIC: List articles
 * GET /api/articles
 */
export const getArticles = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT id, title, excerpt, content, image_url, category, author, read_time, created_at, updated_at
      FROM articles
      ORDER BY created_at DESC
      `
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Get articles error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch articles" });
  }
};

/**
 * PUBLIC: Get one article by id
 * GET /api/articles/:id
 */
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT id, title, excerpt, content, image_url, category, author, read_time, created_at, updated_at
      FROM articles
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Get article by id error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch article" });
  }
};

/**
 * ADMIN: Create article
 * POST /api/articles
 */
export const createArticle = async (req, res) => {
  try {
    const { title, excerpt, content, image_url, category, author, read_time } =
      req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const result = await query(
      `
      INSERT INTO articles
        (title, excerpt, content, image_url, category, author, read_time, created_at, updated_at)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id
      `,
      [
        title.trim(),
        excerpt?.trim() || null,
        content,
        image_url?.trim() || null,
        category?.trim() || null,
        author?.trim() || null,
        read_time?.trim() || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Article created",
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Create article error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create article" });
  }
};

/**
 * ADMIN: Update article
 * PUT /api/articles/:id
 */
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, image_url, category, author, read_time } =
      req.body;

    // optional: require at least 1 field
    if (
      title === undefined &&
      excerpt === undefined &&
      content === undefined &&
      image_url === undefined &&
      category === undefined &&
      author === undefined &&
      read_time === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    const result = await query(
      `
      UPDATE articles
      SET
        title = COALESCE($1, title),
        excerpt = COALESCE($2, excerpt),
        content = COALESCE($3, content),
        image_url = COALESCE($4, image_url),
        category = COALESCE($5, category),
        author = COALESCE($6, author),
        read_time = COALESCE($7, read_time),
        updated_at = NOW()
      WHERE id = $8
      RETURNING id
      `,
      [
        title !== undefined ? title.trim() : null,
        excerpt !== undefined ? excerpt?.trim() || null : null,
        content !== undefined ? content : null,
        image_url !== undefined ? image_url?.trim() || null : null,
        category !== undefined ? category?.trim() || null : null,
        author !== undefined ? author?.trim() || null : null,
        read_time !== undefined ? read_time?.trim() || null : null,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    res.json({ success: true, message: "Article updated" });
  } catch (error) {
    console.error("Update article error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update article" });
  }
};

/**
 * ADMIN: Delete article
 * DELETE /api/articles/:id
 */
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      "DELETE FROM articles WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    res.json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.error("Delete article error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete article" });
  }
};
