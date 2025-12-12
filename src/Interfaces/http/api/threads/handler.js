const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const GetThreadDetailUseCase = require("../../../../Applications/use_case/GetThreadDetailUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postAddThreadHandler = this.postAddThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  async postAddThreadHandler({ payload, auth }, h) {
    const useCasePayload = {
      title: payload.title,
      body: payload.body,
      owner: auth.credentials.id,
    };

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(useCasePayload);

    const response = h.response({
      status: "success",
      message: "SUCCESS_ADDED_NEW_THREAD",
      data: {
        addedThread,
      },
    });

    response.code(201);
    return response;
  }

  async getThreadHandler({ params }, h) {
    const useCasePayload = { thread_id: params.thread_id };
    const getThreadDetailUseCase = this._container.getInstance(
      GetThreadDetailUseCase.name
    );

    const threadData = await getThreadDetailUseCase.execute(useCasePayload);

    const thread = {
      id: threadData.id,
      title: threadData.title,
      body: threadData.body,
      date:
        threadData.date instanceof Date
          ? threadData.date.toISOString()
          : threadData.date,
      username: threadData.username,
      comments: (threadData.comments || []).map((c) => ({
        id: c.id,
        content: c.content,
        date: c.date instanceof Date ? c.date.toISOString() : c.date,
        username: c.username,
        likeCount: Number(c.likeCount || 0),
        replies: (c.replies || []).map((r) => ({
          id: r.id,
          content: r.content,
          date: r.date instanceof Date ? r.date.toISOString() : r.date,
          username: r.username,
        })),
      })),
    };

    return h.response({ status: "success", data: { thread } }).code(200);
  }
}

module.exports = ThreadsHandler;
