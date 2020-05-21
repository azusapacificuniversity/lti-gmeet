#!/usr/bin/python

class FilterModule(object):
    def filters(self):
        return {
            'escape_n_quote': self.escape_n_quote
        }

    def escape_n_quote(self, var):
        return "'" + var.replace("'", "''").replace('\n', '\n\n') + "'"
