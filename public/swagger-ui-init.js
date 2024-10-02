
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/api/users/profile": {
        "get": {
          "operationId": "UserController_getProfile",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/users": {
        "get": {
          "operationId": "UserController_findAll",
          "parameters": [
            {
              "name": "search",
              "required": true,
              "in": "query",
              "schema": {}
            },
            {
              "name": "items_per_page",
              "required": true,
              "in": "query",
              "schema": {}
            },
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/users/{id}": {
        "get": {
          "operationId": "UserController_findOneById",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "UserController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "UserController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginUserDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            },
            "401": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/register": {
        "post": {
          "operationId": "AuthController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RegisterUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/refresh-token": {
        "post": {
          "operationId": "AuthController_refreshToken",
          "parameters": [],
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/posts": {
        "get": {
          "operationId": "PostController_findByPaginate",
          "summary": "Retrieve posts public",
          "description": "\n      This endpoint retrieves a list of posts with optional pagination and filtering.\n      - **page**: The page number to retrieve (default is 1).\n      - **items_per_page**: The number of items per page (default is 10).\n      - **search**: A search term to filter posts by title or content.\n      - **category**: The category ID to filter posts by category.\n    ",
          "parameters": [
            {
              "name": "category",
              "required": false,
              "in": "query",
              "schema": {}
            },
            {
              "name": "search",
              "required": false,
              "in": "query",
              "schema": {}
            },
            {
              "name": "items_per_page",
              "required": false,
              "in": "query",
              "schema": {}
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Post"
          ]
        },
        "post": {
          "operationId": "PostController_createPost",
          "summary": "Create a new post with an optional thumbnail image",
          "description": "\n      This endpoint allows you to create a new post with a thumbnail image.\n      The request must include a file upload for the thumbnail and the post details.\n    ",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "Post details with an optional thumbnail image",
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "thumbnail": {
                      "type": "string",
                      "format": "binary",
                      "description": "Thumbnail image for the post"
                    }
                  },
                  "$ref": "#/components/schemas/CreatePostDTO"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Post successfully created",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "Bad request, validation errors or file errors"
            }
          },
          "tags": [
            "Post"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/posts/{id}": {
        "get": {
          "operationId": "PostController_findDetail",
          "summary": "Retrieve posts detail public",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Post"
          ]
        },
        "put": {
          "operationId": "PostController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePostDTO"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Post"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "PostController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Post"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/categories": {
        "get": {
          "operationId": "CategoryController_findByPaginate",
          "parameters": [
            {
              "name": "search",
              "required": false,
              "in": "query",
              "schema": {}
            },
            {
              "name": "items_per_page",
              "required": false,
              "in": "query",
              "schema": {}
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {}
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "post": {
          "operationId": "CategoryController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCategoryDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/categories/all": {
        "get": {
          "operationId": "CategoryController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/categories/{id}": {
        "get": {
          "operationId": "CategoryController_findOneById",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "put": {
          "operationId": "CategoryController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCategoryDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        },
        "delete": {
          "operationId": "CategoryController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Category"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Api Manage",
      "description": "List api manage",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Auth",
        "description": ""
      },
      {
        "name": "User",
        "description": ""
      },
      {
        "name": "Category",
        "description": ""
      },
      {
        "name": "Post",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "User": {
          "type": "object",
          "properties": {}
        },
        "LoginUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "RegisterUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "password",
            "firstName",
            "lastName"
          ]
        },
        "CreatePostDTO": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "thumbnail": {
              "type": "string"
            },
            "categoryId": {
              "type": "number"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "title",
            "thumbnail",
            "categoryId",
            "description"
          ]
        },
        "UpdatePostDTO": {
          "type": "object",
          "properties": {}
        },
        "CreateCategoryDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "description"
          ]
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
