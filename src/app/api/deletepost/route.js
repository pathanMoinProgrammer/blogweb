export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const postid = searchParams.get('postid');

  if (!postid) {
    return new Response(JSON.stringify({ error: 'Missing postId' }), { status: 400 });
  }

  try {
    await db.recursiveDelete(db.doc(`posts/${postid}`));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}