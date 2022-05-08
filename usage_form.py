import dash_mantine_components as dmc
from dash import Dash, html, Output, Input
from pydantic import BaseModel, Field

app = Dash(__name__)

form_children = [dmc.TextInput()]

app.layout = html.Div(children=[dmc.Form(id="form"), html.Div(id="result")])


class FormData(BaseModel):
    age: int = Field(description="age of person")
    name: str = Field(description="Name of person")
    old: bool = Field(default=True, description="Whether person is old")


form_schema = FormData.schema()


@app.callback(Output("result", "children"), Input("form", "value"))
def update_form(value):
    return str(value)


if __name__ == "__main__":
    app.run_server()
